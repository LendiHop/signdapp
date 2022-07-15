import { DAppClient, SigningType } from "@airgap/beacon-sdk";
import { packDataBytes } from '@taquito/michel-codec';

window.onload = () => {
  document.getElementById("init-wallet").onclick = initWallet;
};

const initWallet = async () => {
  try {
    const dAppClient = new DAppClient({ name: "Michelson Data Sign" });

    // This code should be called every time the page is loaded or refreshed to see if the user has already connected to a wallet.
    const activeAccount = await dAppClient.getActiveAccount();
    if (activeAccount) {
      // If defined, the user is connected to a wallet.
      // You can now do an operation request, sign request, or send another permission request to switch wallet
      console.log("Already connected:", activeAccount.address);
    } else {
      const permissions = await dAppClient.requestPermissions();
      console.log("New connection:", permissions.address);
    }

    const signingMichelsonData = packDataBytes({
      prim: 'Pair', args: [
        { string: 'if you can read this message than task is completed :)' }, // We've hardcoded the data for simplicity
        { int: '123456789' }
      ]
    }).bytes;

    const walletSignedData = await dAppClient.requestSignPayload({
      signingType: SigningType.MICHELINE,
      payload: signingMichelsonData
    });
    console.log(walletSignedData.signature);
  } catch (error) {
    console.log(error);
  }
};
