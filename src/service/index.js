export function serviceCall(action, method, params, success) {
  let requestOptions = {
    method: method
  };
  if (params) {
    requestOptions.body = JSON.stringify(params);
  }
  fetch(`http://localhost:8080/${action}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    if (typeof success === 'function') {
      success(result);
    }
  }).catch((error) => {
    console.log(error);
  });
}