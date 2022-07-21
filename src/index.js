module.exports.onRpcRequest = async ({ origin, request }) => {
  async function getFees() {
    let response = await fetch('https://www.etherchain.org/api/gasPriceOracle');
    return response.text();
  }
  switch (request.method) {
    case 'hello':
      const fees = await getFees();
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Hello, ${origin}!`,
            description:
              'This custom confirmation is just for display purposes.',
            textAreaContent:
            'Current fee estimates: '+fees
          },
        ],
      });
    default:
      throw new Error('Method not found.');
  }
};
