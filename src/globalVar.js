import data from "./Data/data";
import dataMerch from './DataNew/dataMerch';

const globalVar = {
  scrollWidth: 0,
  listData: [],
  mySQLData: [],
  init: function() {
    const scrollDiv = document.createElement('div');
    scrollDiv.style.width = '100px';
    scrollDiv.style.height = '100px';
    scrollDiv.style.overflowY = 'scroll';
    scrollDiv.style.visibility = 'hidden';
    scrollDiv.style.position = 'absolute';
    document.body.appendChild(scrollDiv);
    this.scrollWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    const temp = dataMerch.map((item, index) => {
      return {
        ...item,
        id: 40 + index + 1
      };
    })
    this.listData = [...data, ...temp];
  }
};

export default globalVar;