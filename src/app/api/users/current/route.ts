// import { NextRequest, NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/mongodb";
// import { User } from "@/models/user";
// import { Session } from "@/models/session";

// export async function GET(req: NextRequest) {
//   try {
//     await connectToDatabase();

//     const sessionId = req.cookies.get("sessionId")?.value;
//     const accessToken = req.cookies.get("accessToken")?.value;

//     if (!sessionId || !accessToken) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const session = await Session.findById(sessionId);
//     if (
//       !session ||
//       session.accessToken !== accessToken ||
//       new Date(session.accessTokenValidUntil) < new Date()
//     ) {
//       return NextResponse.json(
//         // { message: "Session invalid or expired" },
//         // { status: 403 }
//         { message: "Session invalid or expired" },
//         { status: 401 } // ← було 403
//       );
//     }
//     // if (err.response?.status === 401 || err.response?.status === 403) {
//     //   return rejectWithValue("Session expired");
//     // }

//     const user = await User.findById(session.userId).select("-password");
//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json({
//       status: 200,
//       message: "Current user fetched successfully",
//       data: user,
//     });
//   } catch (err) {
//     console.error("Current user fetch error:", err);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
