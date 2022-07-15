import { DAppClient, SigningType } from "@airgap/beacon-sdk";
import { packDataBytes } from '@taquito/michel-codec';

window.onload = () => {
  document.getElementById("init-wallet").onclick = initWallet;
};

const initWallet = async () => {
  try {
    const dAppClient = new DAppClient({ name: "Michelson Data Sign" });

    const activeAccount = await dAppClient.getActiveAccount();
    if (activeAccount) {
      const signingMichelsonData = packDataBytes({
        prim: 'Pair', args: [
          { string: 'if you can read this message than task is completed :)' },
          { int: '123456789' }
        ]
      }).bytes;

      const walletSignedData = await dAppClient.requestSignPayload({
        signingType: SigningType.MICHELINE,
        payload: signingMichelsonData
      });
      console.log(walletSignedData.signature);
    }
  } catch (error) {
    console.log(error);
  }
};
