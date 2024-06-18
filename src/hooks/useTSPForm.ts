import { useForm } from "react-hook-form";
import {
  GraphType,
  IAllInfo,
  IFormData,
  IPackages,
} from "@/interfaces/interfaces";
import { useState } from "react";
interface TrucksData {
  // Example: { 1: [["C", 10]], 2: [["A", 5]], 3: [["B", 7]] }
  [key: number]: [string, number][];
}

const useTSPForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();
  const [response, setResponse] = useState<TrucksData>();
  const [graph, setGraph] = useState<GraphType>({});

  const sendRequest = async (data: IAllInfo) => {
    // console.log(data);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        "http://tammam12.pythonanywhere.com/",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const responseData = await response.json();
      console.log(responseData);
      setResponse(responseData.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const splitArray = (capacities: string, symbol: string) => {
    const convertCapacities = capacities.split(symbol);
    return convertCapacities;
  };

  const convertToNumber = (array: string[]) => {
    const newArray = array.map((capacity) => Number(capacity));
    return newArray;
  };

  function addDistance(city1: string, city2: string, distance: number) {
    setGraph((prevGraph) => {
      let newGraph = { ...prevGraph };

      if (!(city1 in newGraph)) {
        newGraph[city1] = {};
      }
      if (!(city2 in newGraph)) {
        newGraph[city2] = {};
      }

      newGraph[city1][city2] = distance;
      newGraph[city2][city1] = distance;

      return newGraph;
    });
  }

  const onSubmit = (data: IFormData) => {
    // console.log(data);
    const { trucksCapacities, packagesInfo, citiesDistances } = data;
    const newCapacities = convertToNumber(splitArray(trucksCapacities, " "));
    // console.log(newCapacities);

    // console.log(newAddresses);
    const splitPackages = splitArray(packagesInfo, " ");
    // console.log(splitPackages);

    const packages: IPackages = {};
    for (let i = 0; i < splitPackages.length; i++) {
      const element = splitPackages[i].split(":").reverse();
      const packageValue = Number(element[1]);
      packages[(i + 1).toString()] = [element[0], packageValue];
    }
    // console.log(packages);

    let Cities_Distances = splitArray(citiesDistances, " ");
    Cities_Distances.forEach((entry) => {
      let [cities, dist] = entry.split(":");
      let city1 = cities[0];
      let city2 = cities[1];
      let distance = parseInt(dist);
      addDistance(city1, city2, distance);
    });

    const allInfo = {
      trucks: newCapacities,
      packages: packages,
      graph: graph,
    };
    // console.log(graph);
    sendRequest(allInfo);
  };
  // console.log(response);
  return { onSubmit, register, handleSubmit, errors, response };
};
export default useTSPForm;
