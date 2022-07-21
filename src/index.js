module.exports.onRpcRequest = async ({ origin, request }) => {
  // async function getFees() {
  //   let response = await fetch('https://www.etherchain.org/api/gasPriceOracle');
  //   return response.text();
  // }

  let state = await wallet.request({
    method: 'snap_manageState',
    params: ['get'],
  });

  if (!state) {
    state = {book:[]}; 
    // initialize state if empty and set default data
    await wallet.request({
      method: 'snap_manageState',
      params: ['update', state],
    });
  }

  switch (request.method) {
    case 'storeAddress': 
    state.book.push({
      name:request.nameToStore,
      address:request.addressToStore
    });
    await wallet.request({
      method: 'snap_manageState', 
      params: ['update', state], 
    }); 
    return true;
      // return wallet.request({
      //   method: 'snap_confirm', 
      //   params: [
      //     {
      //       prompt: `Hello, ${origin}!`, 
      //       description: 
      //         'This custom confirmation is just for display purposes.',
      //       textAreaContent: 
      //         `Name to store: ${request.nameToStore}\n`+
      //         `Address to store: ${request.addressToStore}\n` +
      //         `Addresses in book: ${state.book.length}`,
      //     }, 
      //   ], 
      // }); 
    case 'retrieveAddresses': 
      return state.book;   
    case 'hello':
      let address_book = state.book.map(function(item){
          return `${item.name}: ${item.address}`; 
        }).join("\n"); 
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Hello, ${origin}!`,
            description: 'Address book:',
            textAreaContent: address_book,
          },
        ],
      }); 
    // case 'hello':
    //   const fees = JSON.parse(await getFees());
    //   const baseFee = parseFloat(fees.currentBaseFee);
    //   const safeLow = Math.ceil(baseFee + parseFloat(fees.safeLow));
    //   const standard = Math.ceil(baseFee + parseFloat(fees.standard)); 
    //   const fastest = Math.ceil(baseFee + parseFloat(fees.fastest));
    //   return wallet.request({
    //     method: 'snap_confirm',
    //     params: [
    //       {
    //         prompt: `Hello, ${origin}! Gas Fees`,
    //         description:
    //           'This custom confirCurrent Gas Fees from etherchain.org:',
    //         textAreaContent:
    //         'Low: '+safeLow+"\n"+
    //         'Average: '+standard+"\n"+
    //         'High: '+fastest
    //       },
    //     ],
    //   });
    default:
      throw new Error('Method not found.');
  }
};
