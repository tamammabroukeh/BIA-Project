"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

// Define types
type TrucksData = {
  [key: number]: [string, number][]; // Array of tuples [cityName, value]
};

interface Props {
  data: TrucksData;
}

const TrucksGraph: React.FC<Props> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove(); // Clear existing SVG content

    const truckNumbers = Object.keys(data);

    // Extract nodes (trucks and cities)
    const nodesSet = new Set<string>();
    truckNumbers.forEach((truckNumber) => {
      data[parseInt(truckNumber)].forEach(([cityName]) => {
        nodesSet.add(`Truck ${truckNumber}`);
        nodesSet.add(cityName); // City name
      });
    });

    const nodes = Array.from(nodesSet).map((node, index) => ({
      id: node,
      index,
    }));

    // Create links (edges between trucks and cities)
    const links = truckNumbers.flatMap((truckNumber) =>
      data[parseInt(truckNumber)].map(([cityName, value], index, array) => ({
        source: index === 0 ? `Truck ${truckNumber}` : array[index - 1][0], // Previous city as source
        target: cityName, // City name
        value: value, // Delivery value
      }))
    );

    // Create D3 force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink<any, any>(links)
          .id((d) => (d as any).id) // Cast 'd' to any temporarily
          .distance(120)
      ) // Adjust link distance
      .force("charge", d3.forceManyBody().strength(-200)) // Adjust the strength for repulsion
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Draw links (lines)
    const link = svg
      .selectAll<SVGLineElement, any>("line") // Specify type for lines
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#555") // Dark gray color for links
      .attr("stroke-opacity", 0.8)
      .attr("stroke-width", (d) => Math.sqrt(d.value) * 2); // Increase line width based on value

    // Draw nodes (circles)
    const node = svg
      .selectAll<SVGCircleElement, any>("circle") // Specify type for circles
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 27) // Increase circle radius
      .attr("fill", (d) => (d.id.startsWith("Truck") ? "#032f05" : "#4e9130")) // Dark blue for trucks, light blue for cities
      .attr("stroke", "#abcaaa")
      .attr("stroke-width", 1.5);
    // .call(drag(simulation)); // Call drag function here

    // Add labels to nodes
    const label = svg
      .selectAll<SVGTextElement, any>(".label") // Specify type for labels
      .data(nodes)
      .enter()
      .append("text")
      .text((d) => {
        if (d.id.startsWith("Truck")) {
          return d.id; // Display truck number
        } else {
          return d.id; // Display city name
        }
      })
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#eee"); // Darker text color for better contrast

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as any).x)
        .attr("y1", (d) => (d.source as any).y)
        .attr("x2", (d) => (d.target as any).x)
        .attr("y2", (d) => (d.target as any).y);

      node.attr("cx", (d) => (d as any).x).attr("cy", (d) => (d as any).y);

      label.attr("x", (d) => (d as any).x).attr("y", (d) => (d as any).y);
    });

    // Drag function for nodes
    function drag(simulation: d3.Simulation<any, any>) {
      function dragstarted(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event: any, d: any) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
  }, [data]);

  return (
    <svg
      ref={svgRef}
      width="800"
      height="600"
      style={{ backgroundColor: "#2e3725" }}
    >
      <g />
    </svg>
  );
};

export default TrucksGraph;
