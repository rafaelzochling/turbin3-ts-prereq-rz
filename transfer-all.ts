import {
  Transaction,
  SystemProgram,
  Connection,
  Keypair,
  sendAndConfirmTransaction,
  PublicKey,
} from '@solana/web3.js'
import wallet from './dev-wallet.json'

const TURBIN3_PERSONAL_WALLET = 'CewrWb44QB2QVcUrxpAndqzVXipvbg4m2rb81dxEuMfZ'

;(async () => {
  const fromKeyPair = Keypair.fromSecretKey(new Uint8Array(wallet))
  const toAddress = new PublicKey(TURBIN3_PERSONAL_WALLET)
  const connection = new Connection('https://api.devnet.solana.com')

  try {
    const balance = await connection.getBalance(fromKeyPair.publicKey)
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromKeyPair.publicKey,
        toPubkey: toAddress,
        lamports: balance,
      })
    )

    transaction.recentBlockhash = (
      await connection.getLatestBlockhash('confirmed')
    ).blockhash
    transaction.feePayer = fromKeyPair.publicKey

    const fee =
      (
        await connection.getFeeForMessage(
          transaction.compileMessage(),
          'confirmed'
        )
      ).value || 0
    transaction.instructions.pop()
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: fromKeyPair.publicKey,
        toPubkey: toAddress,
        lamports: balance - fee,
      })
    )

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      fromKeyPair,
    ])

    console.log(
      `Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`
    )
  } catch (error: any) {
    console.error(`Oops, something went wrong: ${error}`)
  }
})()
