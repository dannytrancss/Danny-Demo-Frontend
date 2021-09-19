import {
  CREATE_AGENT,
  UPDATE_AGENT,
  DELETE_AGENT,
} from "../actions/types";

const initialState = [];

const agentReducer = (agents = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_AGENT:
      return [...agents, payload];

    case UPDATE_AGENT:
      return agents.map((agent) => {
        if (agent.id === payload.id) {
          return {
            ...agent,
            ...payload,
          };
        } else {
          return agent;
        }
      });

    case DELETE_AGENT:
      return agents.filter(({ id }) => id !== payload.id);

    default:
      return agents;
  }
};

export default agentReducer;