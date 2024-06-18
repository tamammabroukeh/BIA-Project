import pygad
import numpy as np
import heapq
import logging
from flask_cors import CORS
from flask import Flask, request, jsonify
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes and origins

# Set up logging
logging.basicConfig(level=logging.DEBUG)

@app.route('/', methods=['POST'])
def optimize_route():
    try:
        data = request.get_json()
        if not data:
            logging.error("Invalid input: No data received")
            return jsonify({'error': 'Invalid input'}), 400

        packages = data['packages']
        graph = data['graph']
        Trucks = data['trucks']
        n = len(Trucks)

        def dijkstra(graph, start):
            distances = {node: float('inf') for node in graph}
            distances[start] = 0
            pq = [(0, start)]

            while pq:
                current_distance, current_node = heapq.heappop(pq)

                if current_distance > distances[current_node]:
                    continue

                for neighbor, weight in graph[current_node].items():
                    distance = current_distance + weight

                    if distance < distances[neighbor]:
                        distances[neighbor] = distance
                        heapq.heappush(pq, (distance, neighbor))
            return distances

        def find_all_pairs_shortest_paths(graph):
            all_pairs_shortest_paths = {}
            for node in graph:
                all_pairs_shortest_paths[node] = dijkstra(graph, node)
            return all_pairs_shortest_paths

        def tsp_dp(distances, items):
            n = len(items)
            all_visited = (1 << n) - 1
            memo = {}

            def dp(pos, mask):
                if mask == all_visited:
                    return distances[items[pos]][items[0]]

                if (pos, mask) in memo:
                    return memo[(pos, mask)]

                min_cost = float('inf')
                for next_pos in range(n):
                    if mask & (1 << next_pos) == 0:
                        new_cost = distances[items[pos]][items[next_pos]] + dp(next_pos, mask | (1 << next_pos))
                        min_cost = min(min_cost, new_cost)
                memo[(pos, mask)] = min_cost
                return min_cost

            return dp(0, 1)

        def dictByWeight(list1, list2):
            dict_result = {}
            TrucksCopy = Trucks.copy()
            for key in list1:
                key = int(np.float64(key).real)
                dict_result[key] = []
            for key, value in zip(list1, list2):
                key = int(np.float64(key).real)
                if TrucksCopy[key - 1] - value[1] >= 0:
                    dict_result[key].append(value)
                    TrucksCopy[key - 1] -= value[1]
            return dict_result

        logging.debug("Calculating all pairs shortest paths")
        all_pairs_shortest_paths = find_all_pairs_shortest_paths(graph)

        num_genes = len(packages)
        gene_space = range(1, n + 1)

        def fitness_func(ga_instance, solution, solution_idx):
            comdict = dictByWeight(solution, packages.values())
            total_carried_weight = 0
            for Truck in comdict.values():
                for package in Truck:
                    total_carried_weight += package[1]

            total_distance = 0
            onlyDistinationList = []
            distributeList = list(comdict.values())
            for Truck in distributeList:
                for pkg in Truck:
                    onlyDistinationList.append(pkg[0])

            distances = {item: {} for item in onlyDistinationList}
            for item in onlyDistinationList:
                for target in onlyDistinationList:
                    distances[item][target] = all_pairs_shortest_paths[item][target]
            shortest_path_length = tsp_dp(distances, onlyDistinationList)
            total_distance += shortest_path_length

            if total_distance == 0:
                fitness = 0
            else:
                fitness = (1 / total_distance) * (total_carried_weight**5)
            return fitness

        num_generations = 100  # Number of generations.
        num_parents_mating = 10  # Number of solutions to be selected as parents in the mating pool.
        sol_per_pop = 40  # Number of solutions in the population.
        logging.debug("Starting GA optimization")
        ga_instance = pygad.GA(num_generations=num_generations,
                               num_parents_mating=num_parents_mating,
                               sol_per_pop=sol_per_pop,
                               num_genes=num_genes,
                               fitness_func=fitness_func,
                               gene_space=gene_space,
                               mutation_type="random",
                               mutation_percent_genes=20)

        ga_instance.run()
        solution, solution_fitness, _ = ga_instance.best_solution(ga_instance.last_generation_fitness)

        logging.debug(f"Best solution: {solution}")
        comdict = dictByWeight(solution, packages.values())

        return jsonify({'data': comdict})
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))