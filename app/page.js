import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className=" text-white flex flex-col gap-5 min-h-[50vh] justify-center items-center p-4 text-center">
        <div className="font-bold text-3xl md:text-5xl flex flex-col sm:flex-row justify-center items-center gap-3">Welcome to Get Me A Coke! <img width={90} src="/assets/coke.gif" alt="" /></div>
        <p>
          A crowdfunding platform to fund your favourite Content Creators.
        </p>
        <div>
          <Link href="/about">
          <button type="button" className="text-gray-900 bg-linear-to-r from-teal-400 to-lime-200 hover:bg-linear-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-100 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer">Read More</button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-0.5 opacity-47"></div>

      <div className="text-white container mx-auto py-9 mb-16">
        <div className="text-3xl font-bold text-center m-11 ">Your Next Step Starts Here</div>
        <div className="flex flex-col md:flex-row justify-center items-start gap-16 md:gap-24">
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className="bg-emerald-50 rounded-full p-3" width={88} src="/assets/money.gif" alt="" />
            <p className="font-bold">Make a Donation</p>
            <p className="text-center">Your financial support helps us reach our goals sooner.</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className="bg-emerald-50 rounded-full p-3" width={88} src="/assets/team.gif" alt="" />
            <p className="font-bold">Join Our Community</p>
            <p className="text-center">Get involved and share your ideas who support our mission.</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className="bg-emerald-50 rounded-full p-3 " width={88} src="/assets/man.gif" alt="" />
            <p className="font-bold">Contact Support</p>
            <p className="text-center">Need assistance? Our dedicated team is ready to help you.</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-0.5 opacity-47"></div>

      <div className="py-16">
        <div className="container mx-auto max-w-4xl p-4 shadow-2xl bg-gray-900 rounded-xl">
          <video loop autoPlay muted src="/assets/home.mp4" className="w-full h-auto rounded-lg"></video>
        </div>
      </div>


    </>
  );
}
