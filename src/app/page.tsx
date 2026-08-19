import Tabs from "@/ui/Tabs";
import VehicleSearch from "@/ui/VehicleSearch";

export default function Home() {
  const tabData = [
    {
      tabName: "Book a car",
      tabContent: <VehicleSearch />,
    },
    {
      tabName: "Buy a car",
      tabContent: <p>Buy a car!</p>,
    },
  ];

  return (
    <main>
      {/* Rydio+ Banner */}
      <div className="text-center font-bold bg-black py-3 text-sm">
        <span className="text-brand-green-300 white">
          Your fastest way to earn status.
        </span>{" "}
        <a className="text-white underline whitespace-nowrap">
          Join Rydio+ for free.
        </a>
      </div>

      {/* Hero Section */}
      {/* bg-cover will size the image to cover the background with any overhang invisible off-screen */}
      <section className="flex flex-col md:flex-row-reverse gap-x-8 justify-end bg-black bg-[url(/puppies_1680x1121.jpg)] bg-size-[27.5rem] md:bg-cover bg-position-[100%_0%] bg-no-repeat min-h-144 text-white p-4 pb-12">
        <div className="flex flex-col justify-center">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-[2.625rem] xl:text-5xl">
            Make travel feel golden with Hertz
          </h1>
          <p className="hidden md:block text-2xl xl:text-[1.75rem]">
            New rental cars. Round trip or one-way. Let's go!
          </p>

          {/* Three Rental Features with Icons */}
          <div className="hidden md:flex md:flex-col xl:flex-row">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-12 fill-brand-green-300 text-brand-green-base"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>

              <p>
                <b>2026 Most Trusted Brand</b>
                <br />
                Voted by customers via USA Today*
              </p>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-12 fill-brand-green-300 text-brand-green-base"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                />
              </svg>

              <p>
                <b>Skip the line</b>
                <br />
                No hassle, just drive
              </p>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-12 fill-brand-green-300 text-brand-green-base"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>

              <p>
                <b>#1 Loyalty Program</b>
                <br />
                Voted by customers via Newsweek^
              </p>
            </div>
          </div>
        </div>

        {/* Booking & Buying Forms */}
        <Tabs tabData={tabData} />
      </section>
      <p className="h-screen">Paragraph</p>
      <p className="h-screen">Paragraph</p>
    </main>
  );
}
