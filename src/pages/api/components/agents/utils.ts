import {
  filterRecordInfo,
  recordFilterOpts,
  RecordMap,
  requestTranslateOpts,
  translateRequest,
} from '../../utils/filter-record';

const agentAliasMap: RecordMap = {
  RepID: 'number',
};

const defaultAgentFields = ['RepID', 'Name', 'Primary Contact', 'Email'];

function filterAgentInfo(filterOpts?: recordFilterOpts) {
  return filterRecordInfo({
    aliasMap: agentAliasMap,
    selectedFields: defaultAgentFields,
    ...filterOpts,
  });
}

const filterAgentFields = filterAgentInfo();

function translateAgentRequest(options?: requestTranslateOpts) {
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
