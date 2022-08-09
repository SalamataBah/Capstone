var allSortedDistances = [];

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  function distance(lat1, lon1, lat2, lon2) {
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
  
    let c = 2 * Math.asin(Math.sqrt(a));
    let r = 6371;
    return c * r;
  }
  
  function partition(arr, low, high, userPositionLat, userPositionLong) {
    let userLocationLat = arr[high].lat;
    let userLocationLong = arr[high].lng;
    let pivot = distance(
      userPositionLat,
      userPositionLong,
      userLocationLat,
      userLocationLong
    );
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
      let currUserLat = arr[j].lat;
      let currUserLng = arr[j].lng;
      let currPivot = distance(
        userPositionLat,
        userPositionLong,
        currUserLat,
        currUserLng
      );
      if (currPivot < pivot) {
        i++;
        swap(arr, i, j);
      }
    }
    swap(arr, i + 1, high);
    return i + 1;
  }
  
  function quickSort(arr, low, high, userPositionLat, userPositionLong) {
    if (low < high) {
      let pi = partition(arr, low, high, userPositionLat, userPositionLong);
      quickSort(arr, low, pi - 1, userPositionLat, userPositionLong);
      quickSort(arr, pi + 1, high, userPositionLat, userPositionLong);
    }
  }
  
  function sortUsersCoords(usersCoords, userPositionLat, userPositionLong) {
    quickSort(usersCoords, 0, usersCoords.length - 1, userPositionLat, userPositionLong);
   
    allSortedDistances = usersCoords    
    return usersCoords;
  }

  module.exports ={sortUsersCoords, allSortedDistances} 
  