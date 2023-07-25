import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import currentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

export async function getServerSideProps(context:NextPageContext) {
    const session= await getSession(context);
    if(!session) {
        return {
            redirect:{
                destination:'/auth',
                permanent:false,
            }
        }
    }

    return {
        props:{}
    }
}

const Profile = () => {
    const router= useRouter();
    const {data:user} =currentUser();

    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-white text-3xl md:text-6xl text-center">
                    Who is Watching?
                </h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div className="" onClick={() => router.push('/')}>
                        <div className="group flex-row w-44 mx-auto">
                            <div 
                                className="
                                    w-44 h-44 rounded-md
                                    flex items-center justify-center
                                    border-2 border-transparent
                                    group-hover:border-white
                                    group-hover:cursor-pointer
                                    overflow-hidden
                                "
                            >
                                <img src="/images/default-blue.png" alt="profile-img" />
                            </div>
                            <div 
                                className="
                                    text-gray-400 mt-4 text-center text-2xl
                                    group-hover:text-white
                                "
                            >
                                {user?.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;