import React from "react";
import { gql, useQuery } from "@apollo/client";

import Repositories from "../repositories";

import Location from "../../images/location.svg";
import Link from "../../images/link.svg";

import "./organization.scss";

const GET_ORG_INFO = gql`
  query($login: String!, $after: String) {
    organization(login: $login) {
      name
      avatarUrl
      location
      websiteUrl
      repositories(first: 5, after: $after) {
        edges {
          node {
            name
            description
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 10) {
                    totalCount
                  }
                }
              }
            }
            parent {
              nameWithOwner
            }
            licenseInfo {
              name
            }
            updatedAt
            primaryLanguage {
              id
              color
              name
            }
            stargazers {
              totalCount
            }
          }
        }
        pageInfo {
          endCursor
        }
      }
    }
  }
`;

const Organization = ({ orgLogin }) => {
  const { loading, error, data, fetchMore } = useQuery(GET_ORG_INFO, {
    variables: { login: orgLogin, after: null },
  });
  console.log("data", data);

  if (loading || !data) return <p className="text-center"> Loading ... </p>;
  if (error)
    return (
      <p className="text-red-700 m-4 text-center">something went wrong !</p>
    );

  const {
    avatarUrl,
    name,
    location,
    websiteUrl,
    repositories,
  } = data.organization;
  return (
    <div className="organization  py-16 ">
      <div className="sm:container mx-auto bg-white rounded-lg">
        <div className="organization-header sm:flex xs:text-center sm:text-left items-center ">
          <img
            className="organization-avatar xs:m-auto sm:m-0"
            src={avatarUrl}
            alt="Avatar Url"
          />
          <div className="organization-header-details mx-4">
            <h2 className="text-3xl">{name}</h2>
            <div>
              <img
                className="organization-icon"
                src={Location}
                alt="location icon"
              />
              <span className="text-gray-600 organization-location">
                {location}
              </span>
            </div>
            <div>
              <img
                className="organization-icon"
                src={Link}
                alt="location icon"
              />
              <a className="organization-website" href={websiteUrl}>
                {websiteUrl}
              </a>
            </div>
          </div>
        </div>

        <Repositories
          repositories={repositories}
          onLoadMore={() =>
            fetchMore({
              variables: { after: repositories.pageInfo.endCursor },
              updateQuery: (prev, { fetchMoreResult }) => {
                fetchMoreResult.organization.repositories.edges = [
                  ...prev.organization.repositories.edges,
                  ...fetchMoreResult.organization.repositories.edges,
                ];
                return fetchMoreResult;
              },
            })
          }
        />
      </div>
    </div>
  );
};
export default Organization;
