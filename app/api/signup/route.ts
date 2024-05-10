import prisma from "@/app/lib/prisma";
//import { signupUser } from "littlefish-nft-auth-framework-beta";
//const { signupUser } = require('littlefish-nft-auth-framework-beta');

export async function POST(request: Request) {
    console.log("1")
    const body = await request.json();
    const {
        email,
        passwordHash,
        walletAddress,
        walletNetwork,
        signature,
        key,
        nonce
    } = body;
    //const result = await signupUser(email, passwordHash, walletAddress, walletNetwork, signature, key, nonce);
    const result = { success: true, email, passwordHash, walletAddress, walletNetwork, signature, key, nonce };
    if (!result.success) {
        return new Response(JSON.stringify({ error: result.error }), { status: 400 });
    }

    if (result.success) {
        if ( result.email && result.passwordHash ) {
            await prisma.user.create({
                data: {
                    email: result.email,
                    password: result.passwordHash,
                    emailVerified: new Date(),
                },
            });
        } else if (result.walletAddress && result.walletNetwork, result.walletNetwork) {
            console.log("hehe")
            await prisma.user.create({
                data: {
                    walletAddress: result.walletAddress,
                    walletNetwork: result.walletNetwork,
                    walletAddressVerified: new Date(),
                },
            });
        }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}