import {
  CREATE_AGENT,
  UPDATE_AGENT,
  DELETE_AGENT,
  GET_AGENT_LIST,
} from "./types";

import AgentDataService from "../services/AgentService";

// create a new agent
export const createAgent = (newAgent) => async (dispatch) => {
  try {
    const res = await AgentDataService.create(newAgent);

    dispatch({
      type: CREATE_AGENT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

// Get agents list with paging
export const getAgentList = (pageNumber, pageSize) => async (dispatch) => {
  try {
    const res = await AgentDataService.getAgentList(pageNumber, pageSize);

    dispatch({
      type: GET_AGENT_LIST,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};

// Update an agent
export const updateAgent = (data) => async (dispatch) => {
  try {
    const res = await AgentDataService.update(data);

    dispatch({
      type: UPDATE_AGENT,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

// Delete an agent by id
export const deleteAgent = (id) => async (dispatch) => {
  try {
    const res = await AgentDataService.remove(id);

    dispatch({
      type: DELETE_AGENT,
      payload: { id },
    });

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};
