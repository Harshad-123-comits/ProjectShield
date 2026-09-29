/**
 * Parses query parameters into a MongoDB $match object.
 */
exports.parseFilters = (query) => {
  const match = {};
  
  if (query.sector) {
    match.sector = query.sector;
  }
  if (query.ministry) {
    match.ministry = query.ministry;
  }
  if (query.state) {
    match.state = query.state;
  }
  if (query.status) {
    match.status = query.status;
  }
  if (query.riskLevel) {
    match.riskLevel = query.riskLevel;
  }
  if (query.reportingMonth) {
    if (query.reportingMonth.match(/^\d{4}-\d{2}$/)) {
      const parts = query.reportingMonth.split('-');
      const year = parseInt(parts[0]);
      const month = parseInt(parts[1]);
      match.reportingMonth = {
        $gte: new Date(year, month - 1, 1),
        $lte: new Date(year, month, 0)
      };
    } else {
      const d = new Date(query.reportingMonth);
      if (!isNaN(d.getTime())) {
        match.reportingMonth = d;
      }
    }
  } else if (query.reportingMonthFrom || query.reportingMonthTo) {
    match.reportingMonth = {};
    if (query.reportingMonthFrom) {
       const d = new Date(query.reportingMonthFrom);
       if (!isNaN(d.getTime())) match.reportingMonth.$gte = d;
    }
    if (query.reportingMonthTo) {
       const d = new Date(query.reportingMonthTo);
       // if it's YYYY-MM, make it end of month
       if (query.reportingMonthTo.match(/^\d{4}-\d{2}$/)) {
          const parts = query.reportingMonthTo.split('-');
          match.reportingMonth.$lte = new Date(parseInt(parts[0]), parseInt(parts[1]), 0);
       } else {
          if (!isNaN(d.getTime())) match.reportingMonth.$lte = d;
       }
    }
  }
  if (query.q) {
     match.$text = { $search: query.q };
  }
  
  return match;
};
