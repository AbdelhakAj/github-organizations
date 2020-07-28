import React from "react";
import { get, has } from "lodash";
import moment from "moment";

import Star from "../../images/star.svg";
import Branch from "../../images/git-branch.svg";
import Law from "../../images/law.svg";

import "./repositories.scss";

const renderRepos = (repositories) => {
  return (
    repositories &&
    repositories.edges.map(({ node }) => (
      <div className="repository border-r border-b border-l py-4 px-8">
        <h3
          className={`text-xl ${!has(node, "parent.nameWithOwner") && "mb-4"}`}
        >
          {node.name}
        </h3>
        {has(node, "parent.nameWithOwner") && (
          <p className="text-gray-600 text-sm mb-4">
            forked from {get(node, "parent.nameWithOwner", "")}
          </p>
        )}
        <p>{node.description}</p>

        <div className="repository-details sm:flex">
          <div className="flex">
            <span
              className="repository-language-color"
              style={{
                background: get(node, "primaryLanguage.color", "#000"),
              }}
            ></span>
            <span className="text-gray-600 repository-language">
              {get(node, "primaryLanguage.name", "n/a")}
            </span>
          </div>
          <div className="flex">
            <img className="repository-icon" src={Star} alt="location icon" />
            <span className="text-gray-600 repository-star">
              {get(node, "stargazers.totalCount", "n/a")}
            </span>
          </div>
          <div className="flex">
            <img className="repository-icon" src={Branch} alt="location icon" />
            <span className="text-gray-600 repository-branch">
              {get(node, "defaultBranchRef.target.history.totalCount", "n/a")}
            </span>
          </div>
          <div className="flex">
            <img className="repository-icon" src={Law} alt="location icon" />
            <span className="text-gray-600 repository-license">
              {get(node, "licenseInfo.name", "n/a")}
            </span>
          </div>
          <div className="flex">
            <span className="text-gray-600 repository-update">
              updated on {moment(node.updatedAt).format("D MMM")}
            </span>
          </div>
        </div>
      </div>
    ))
  );
};

const renderPinnedRepos = (pinnedRepositories) => {
  pinnedRepositories &&
    pinnedRepositories.edges.map(({ node }) => (
      <div className="repository border xs:w-full sm:w-1/3 py-4 px-8">
        <h3 className="text-xl">{node.name}</h3>
        <p className="mb-8">{node.description}</p>
        <div className="repository-details sm:flex">
          <div className="flex">
            <span
              className="repository-language-color"
              style={{
                background: get(node, "primaryLanguage.color", "#000"),
              }}
            ></span>
            <span className="text-gray-600 repository-language">
              {get(node, "primaryLanguage.name", "n/a")}
            </span>
          </div>
          <div className="flex">
            <img className="repository-icon" src={Star} alt="location icon" />
            <span className="text-gray-600 repository-star">
              {get(node, "stargazers.totalCount", "n/a")}
            </span>
          </div>
          <div className="flex">
            <img className="repository-icon" src={Branch} alt="location icon" />
            <span className="text-gray-600 repository-branch">
              {get(node, "defaultBranchRef.target.history.totalCount", "n/a")}
            </span>
          </div>
          <div className="flex">
            <img className="repository-icon" src={Law} alt="location icon" />
            <span className="text-gray-600 repository-license">
              {get(node, "licenseInfo.name", "n/a")}
            </span>
          </div>
        </div>
      </div>
    ));
};

const Repositories = ({ repositories, onLoadMore }) => {
  return (
    <div className="repositories py-4">
      <div className="repositories-title py-4 px-8">
        <h2 className="text-2xl">Pinned Repositories</h2>
      </div>
      {renderPinnedRepos()}

      <div className="repositories-title py-4 px-8 border-b">
        <h2 className="text-2xl">Repositories</h2>
      </div>
      {renderRepos(repositories)}

      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 my-4 mx-auto w-64 border border-gray-400 rounded shadow block"
        onClick={onLoadMore}
      >
        load more
      </button>
    </div>
  );
};
export default Repositories;
