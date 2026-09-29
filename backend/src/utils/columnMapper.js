/**
 * Maps varying CSV/Excel column names to standardized schema fields.
 */

const normalizeKey = (key) => key.toLowerCase().replace(/[^a-z0-9]/g, '');

const MAPPING = {
  projectcode: 'projectCode',
  projectid: 'projectCode',
  id: 'projectCode',
  
  projectname: 'projectName',
  name: 'projectName',
  
  sectorname: 'sector',
  sector: 'sector',
  
  lineministry: 'ministry',
  ministry: 'ministry',
  ministrydepartment: 'ministry',
  department: 'department',
  
  statename: 'state',
  state: 'state',
  statesut: 'state',
  
  implementingagency: 'implementingAgency',
  agency: 'implementingAgency',
  
  originalcost: 'originalCost',
  originalapprovedcost: 'originalCost',
  
  revisedcost: 'revisedCost',
  latestrevisedcost: 'revisedCost',
  
  expenditure: 'expenditure',
  cumulativeexpenditure: 'expenditure',
  
  originalstartdate: 'originalStartDate',
  
  originalenddate: 'originalEndDate',
  
  reviseddate: 'revisedEndDate',
  latestreviseddate: 'revisedEndDate',
  revisedenddate: 'revisedEndDate',
  
  physicalprogress: 'physicalProgress',
  progress: 'physicalProgress',
  
  monthyear: 'reportingMonth',
  reportingmonth: 'reportingMonth'
};

exports.mapRecord = (record) => {
  const mapped = {};
  for (const [key, value] of Object.entries(record)) {
    const normalized = normalizeKey(key);
    if (MAPPING[normalized]) {
      mapped[MAPPING[normalized]] = value;
    }
  }
  return mapped;
};
