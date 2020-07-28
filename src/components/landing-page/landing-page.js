import React from "react";
import { gql, useLazyQuery } from "@apollo/client";

import SearchBar from "../search-bar";

const GET_ORG = gql`
  query getOrg($login: String!) {
    organization(login: $login) {
      name
    }
  }
`;

const LandingPage = ({ onSearch }) => {
  const [getOrganization, { loading, error, data }] = useLazyQuery(GET_ORG);
  return (
    <div className="landing-page h-screen ">
      <div className="container mx-auto">
        <SearchBar
          loading={loading}
          onSearch={(searchValue) =>
            getOrganization({
              variables: { login: searchValue },
            })
          }
        />
        {error && <p className="text-red-700">something went wrong !</p>}
      </div>
    </div>
  );
};
export default LandingPage;
