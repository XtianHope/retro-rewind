import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";

import UserList from "../components/UserList";
import { MagnifyingGlass } from 'react-loader-spinner'

function Home() {
  const { data, loading, error } = useQuery(QUERY_USERS);

  const users = data?.users || [];

  if (error) {
    throw Error(error);
  }

  if (loading) {
    return <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <h2> <MagnifyingGlass
        visible={true}
        height="200"
        width="200"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#C0EFFF"
        color="brown"
      /></h2>;
    </div>
  }


  return (
    <>
      <div>Home</div>
      <UserList users={users} />
    </>
  );
}

export default Home;