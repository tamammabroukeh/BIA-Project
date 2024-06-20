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
  // some states from react-hook-form library
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();
  // state to store the response
  const [response, setResponse] = useState<TrucksData>();
  // state to store the graph
  const [graph, setGraph] = useState<GraphType>({});
  // state for loading spinner
  const [loading, setLoading] = useState(false);
  // function to send a request
  const sendRequest = async (data: IAllInfo) => {
    setLoading(true);
    // options we should send it with request
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    try {
      // send a request and store it
      const response = await fetch(
        "https://tammam123.pythonanywhere.com/", // api
        requestOptions
      );
      // if we have an error with response
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      // casting a response to json format response
      const responseData = await response.json();
      console.log(responseData);
      // store the result
      setResponse(responseData.data);
      // hide loading
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // function to split a string to array with character
  const splitArray = (capacities: string, symbol: string) => {
    const convertCapacities = capacities.split(symbol);
    return convertCapacities;
  };
  // function to convert array of strings to array of numbers
  const convertToNumber = (array: string[]) => {
    const newArray = array.map((capacity) => Number(capacity));
    return newArray;
  };
  // function to add all distances between cities
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
  // function to submit the form
  const onSubmit = (data: IFormData) => {
    // console.log(data);
    // distruct trucks, packages and distances between cities
    const { trucksCapacities, packagesInfo, citiesDistances } = data;
    // split and convert trucks element
    const newCapacities = convertToNumber(splitArray(trucksCapacities, " "));
    // split packages
    const splitPackages = splitArray(packagesInfo, " ");
    const packages: IPackages = {};
    // to add packages value and city to packages object
    for (let i = 0; i < splitPackages.length; i++) {
      const element = splitPackages[i].split(":").reverse();
      const packageValue = Number(element[1]);
      packages[(i + 1).toString()] = [element[0], packageValue];
    }
    // console.log(packages);
    // to collect sitances between cities and send it to addDistance function
    let Cities_Distances = splitArray(citiesDistances, " ");
    Cities_Distances.forEach((entry) => {
      let [cities, dist] = entry.split(":");
      let city1 = cities[0];
      let city2 = cities[1];
      let distance = parseInt(dist);
      addDistance(city1, city2, distance);
    });
    // all information we need send it to api
    const allInfo = {
      trucks: newCapacities,
      packages: packages,
      graph: graph,
    };
    // console.log(graph);
    // call sendRequest function to send a post request to api
    sendRequest(allInfo);
  };
  // console.log(response);
  return { onSubmit, register, handleSubmit, errors, response, loading };
};
export default useTSPForm;
