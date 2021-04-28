import { RepsTable } from '../../modules/db-adapter';
import { filterAgentFields, translateAgentFields } from './utils';

async function createAgent(agentDetails: {}) {
  const agentInfo = translateAgentFields(agentDetails);

  // Ensure agent numbers aren't duplicated and return error if any exist
  const newAgentNumber = agentInfo['RepID'];
  const matchedAgents = await RepsTable.all({
    filterField: { field: 'RepID', query: newAgentNumber },
  });

  if (matchedAgents.length > 0) {
    throw {
      errorMessage: 'Agent Number already exists, please choose another',
    };
  }

  try {
    const agentRecord = await RepsTable.createRow(agentInfo);
    const newAgent = filterAgentFields(agentRecord);
    return newAgent;
  } catch (error) {
    console.error(error);
    const errorMessage = `Couldn't create new agent\n ${error.message}`;
    throw { errorMessage, code: 500 };
  }
}

async function searchAgent(query: string) {
  const searchOptions = { field: 'RepID', query };

  try {
    const matchedAgentsRecords = await RepsTable.all({
      filterField: searchOptions,
    });

    if (matchedAgentsRecords.length == 0) {
      throw { message: 'No agent found' };
    }

    const matchedAgents = matchedAgentsRecords.map(filterAgentFields);

    return matchedAgents;
  } catch (error) {
    console.error(error);
    const errorMessage = `Couldn't find agent number ${query} \n ${error.message}`;
    throw { errorMessage };
  }
}

async function getAgent(id: string) {
  try {
    const agentRecord = await RepsTable.getRow(id);
    const agent = filterAgentFields(agentRecord);
    return agent;
  } catch (error) {
    console.error(error);
    const errorMessage = `Couldn't find agent ${id} \n ${error.message}`;
    throw { errorMessage, code: 400 };
  }
}

async function getAllAgents() {
  return {};
}

async function updateAgentInfo(id: string, changes) {
  try {
    const update = { id, fields: translateAgentFields(changes) };

    const [updatedAgentRecord] = await RepsTable.updateRow([update]);
    const updatedAgent = filterAgentFields(updatedAgentRecord);
    return updatedAgent;
  } catch (error) {
    console.error(error);
    const errorMessage = `Couldn't update agent ${id}\n ${error.message}`;
    throw { errorMessage };
  }
}

async function archiveAgents(agents: string[]) {
  const errorMessage = 'This API method has not been yet implemented';
  throw { errorMessage, code: 500 };
}

export {
  createAgent,
  searchAgent,
  getAllAgents,
  getAgent,
  updateAgentInfo,
  archiveAgents,
};
