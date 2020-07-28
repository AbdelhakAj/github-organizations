import React from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { useNavigate } from "@reach/router";

import SearchBar from "../search-bar";

const GET_ORG = gql`
  query getOrg($login: String!) {
    organization(login: $login) {
      id
      name
    }
  }
`;

const LandingPage = () => {
  const [getOrganization, { loading, error, data }] = useLazyQuery(GET_ORG, {
    onCompleted: ({ organization }) => {
      console.log("data", data);
      navigate(`/organization/${organization.name}`);
    },
  });
  const navigate = useNavigate();
  return (
    <div className="landing-page h-screen ">
      <div className="sm:container mx-auto">
        <h1 className="text-6xl text-center">GitHub Organizations</h1>
        <SearchBar
          loading={loading}
          onSearch={(searchValue) =>
            getOrganization({
              variables: { login: searchValue },
            })
          }
        />
        {error && (
          <p className="text-red-700 m-4 text-center">something went wrong !</p>
        )}
      </div>
    </div>
  );
};
export default LandingPage;
