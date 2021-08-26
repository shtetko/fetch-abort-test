(() => {
  const fetchUrlBtn = document.getElementById('fetchUrlBtn');
  const abortFetchUrlBtn = document.getElementById('abortFetchUrlBtn');
  const result = document.getElementById('result');
  
  const url = 'http://localhost:8000/fake-api/';
  
  let abortController;
  let signal;
  
  const handleFetchUrl = () => {
    abortController = new AbortController();
    signal = abortController.signal;
    
    result.innerHTML = `<i>Requesting data...</i>`;
    
    fetch(url, {signal})
    .then(res => res.json())
    .then(json => {
      result.innerText = JSON.stringify(json);
    })
    .catch(err => {
      if (err.name === 'AbortError') {
        result.innerText = 'Cancel fetch request by aborting.';
      } else {
        result.innerText = 'Failed: check error on console.'
        console.log('Error: ', err);
      }
    });
  }
  
  const handleAbortFetchUrl = () => {
    abortController.abort();
  }
  
  fetchUrlBtn.addEventListener('click', handleFetchUrl, false);
  abortFetchUrlBtn.addEventListener('click', handleAbortFetchUrl, false);
})();