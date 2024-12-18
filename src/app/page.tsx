import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export default async function Home() {

  const cookie = cookies().get("w11-Sessionid")
  console.log("cookie", cookie?.name)

  if (cookie?.name === "w11-Sessionid") {
    redirect('/cricket/upcoming');
  } else {
    redirect('/login');
  }

}
