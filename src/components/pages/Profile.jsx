import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <main className="relative">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
        <div className="overflow-hidden rounded-lg bg-white">
          <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
            <form
              className="divide-y divide-gray-200 lg:col-span-9"
              action="#"
              method="POST"
            >
              <div className="py-6 px-4 sm:p-6 lg:pb-8">
                <div>
                  <h2 className="text-lg font-medium leading-6 text-gray-900">
                    Profile
                  </h2>
                </div>
                <div className="mt-6 flex flex-col lg:flex-row">
                  <div className="flex-grow space-y-6">
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={currentUser?.data?.user?.name}
                          autoComplete="name"
                          className="block w-full min-w-0 min-h-9 px-1 outline-none bg-gray-100 flex-grow rounded-md sm:text-sm cursor-not-allowed"
                          readOnly
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          value={currentUser?.data?.user?.email}
                          className="mt-1 block w-full rounded-md outline-none bg-gray-100 min-h-9 px-1 shadow-sm sm:text-sm cursor-not-allowed"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0">
                    <div className="mt-1 lg:hidden">
                      <div className="flex justify-center">
                        <div
                          className="inline-block h-16 w-16 flex-shrink-0 overflow-hidden rounded-full"
                          aria-hidden="true"
                        >
                          <img
                            className="h-full w-full rounded-full"
                            src={`${
                              currentUser?.data?.user?.avatar?.url
                                ? currentUser?.data?.user?.avatar?.url
                                : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                            }`}
                            alt="svg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="relative hidden overflow-hidden rounded-full lg:block">
                      <img
                        className="relative h-40 w-40 rounded-full"
                        src={`${
                          currentUser?.data?.user?.avatar?.url
                            ? currentUser?.data?.user?.avatar?.url
                            : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                        }`}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-12 gap-6">
                  <div className="col-span-12 sm:col-span-6">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone number
                    </label>
                    <input
                      type="text"
                      name="phone-number"
                      id="phone-number"
                      value={
                        currentUser?.data?.user?.phone === "undefined"
                          ? ""
                          : currentUser?.data?.user?.phone
                      }
                      autoComplete="phone-number"
                      className="mt-1 block w-full rounded-md bg-gray-100 outline-none py-2 px-1 shadow-sm sm:text-sm cursor-not-allowed"
                      readOnly
                    />
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Gender
                    </label>
                    <input
                      type="text"
                      name="gender"
                      id="gender"
                      value={
                        currentUser?.data?.user?.gender === "undefined"
                          ? ""
                          : currentUser?.data?.user?.gender
                      }
                      autoComplete="gender"
                      className="mt-1 block w-full rounded-md bg-gray-100 outline-none py-2 px-1 shadow-sm sm:text-sm cursor-not-allowed"
                      readOnly
                    />
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Is Admin
                    </label>
                    <input
                      type="text"
                      name="text"
                      id="text"
                      value={currentUser?.data?.user?.is_admin ? "Yes" : "No"}
                      autoComplete="text"
                      className="mt-1 block w-full rounded-md outline-none bg-gray-100 py-2 px-1 shadow-sm sm:text-sm cursor-not-allowed"
                      readOnly
                    />
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Is Verified
                    </label>
                    <input
                      type="text"
                      name="text"
                      id="text"
                      value={
                        currentUser?.data?.user?.is_verified ? "Yes" : "No"
                      }
                      autoComplete="text"
                      className="mt-1 block w-full rounded-md outline-none bg-gray-100 py-2 px-1 shadow-sm sm:text-sm cursor-not-allowed"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
