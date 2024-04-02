// filters.js

export default function createfilters() {
  function applySearchFilters(data, keywords, filterProps) {
    // filterProps :  검색 필터링을 적용할 대상 속성들의 배열
    return data.filter(row => {
      return keywords.every(keyword => {
        return filterProps.some(prop => {
          return keyword ? row[prop].toLowerCase().includes(keyword.toLowerCase()) : true;
        });
      });
    });
  }
  
  function applyExtractOptions(data,prop, filterProp, filterValue) {
    // !filterValue : 옵션 항목을 위해 전체 리스트에서 중복 없는 고객사항목을 추출
    // filterValue : 옵션 항목을 위해 전체 리스트에서 조건이 일치하는 중복 없는 그룹항목을 추출
    const optionsSet = new Set();
    data.forEach(item => {
      if (!filterValue || item[filterProp] === filterValue) {
        optionsSet.add(item[prop]);
      }
    });
    const options = Array.from(optionsSet);
    options.push('');
    return options;
  }
  
  function applyPaginatedData(data, currentPage, pageSize) {
    // 현재 페이지에 해당하는 데이터만 추출하여 반환합니다.
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    // console.log(currentPage, pageSize);
    return data.slice(startIndex, endIndex);
  }

  return {applySearchFilters, applyExtractOptions, applyPaginatedData};
  
}






