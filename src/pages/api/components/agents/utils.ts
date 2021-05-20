import type { Fields } from '@srcTypes/api.types';
import {
  filterRecordInfo,
  recordFilterOpts,
  RecordMap,
  requestTranslateOpts,
  translateRequest,
} from '../../utils/filter-record';

interface AgentResponse {
  number: string;
  name: string;
  primaryContact: string;
  email: string;
}
type AgentFields = Fields['Reps'];

const agentAliasMap: RecordMap<AgentFields, AgentResponse> = {
  RepID: 'number',
};

const defaultAgentFields = [
  'RepID',
  'Name',
  'Primary Contact',
  'Email',
] as Array<keyof AgentFields>;

function filterAgentInfo(
  filterOpts?: recordFilterOpts<AgentFields, AgentResponse>,
) {
  return filterRecordInfo({
    aliasMap: agentAliasMap,
    selectedFields: defaultAgentFields,
    ...filterOpts,
  });
}

const filterAgentFields = filterAgentInfo();

function translateAgentRequest(
  options?: requestTranslateOpts<AgentFields, AgentResponse>,
) {
  return translateRequest({
    aliasMap: agentAliasMap,
    ...options,
  });
}
const translateAgentFields = translateAgentRequest();

export {
  filterAgentInfo,
  filterAgentFields,
  translateAgentRequest,
  translateAgentFields,
};
