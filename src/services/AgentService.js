import http from "../http-common";

// get agent list with paging
const getAgentList = (pageNumber, pageSize) => {
  return http.get("/agents",{
    params:{
      PageNumber: pageNumber,
      PageSize: pageSize
    }
  });
};

// get an agent by id
const getAgentById = id => {
  return http.get(`/agents/${id}`);
};

// Create a new agent
const create = data => {
  return http.post("/agents", data);
};

// update an agent
const update = (data) => {
  return http.put(`/agents/`, data);
};

// remove an agent by id
const remove = id => {
  return http.delete(`/agents/${id}`);
};

const AgentService = {
  getAgentList,
  getAgentById,
  create,
  update,
  remove,
};

export default AgentService;
