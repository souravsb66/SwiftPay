import React, { useState } from "react";
import styled from "styled-components";
import { SubscriptionsCard } from "./SubscriptionsCard";
import { ButtonSmall,ButtonOutline } from "../../Buttons";
import { Modal } from "../../modals/Modal";
import { SubscriptionDetails } from "../../forms/SubscriptionDetails";

export const RecommendedSubscriptions = ({
  recommendedSubscriptions,
  openViewModal,
  setModalSubscriptionData,
  openBuyModal,
  getSubscriptions
}) => {
  const handleBuySubscription = (ele) => {
    setModalSubscriptionData(ele);
    openBuyModal();
  };

  const handleViewDetails = (ele) => {
    setModalSubscriptionData(ele);
    openViewModal();
  };

  return (
    <DIV>
      {recommendedSubscriptions &&
        recommendedSubscriptions.map((ele) => {
          return (
            <SubscriptionsCard
              key={ele.id}
              {...ele}
              children={
                <div className="recommendedSubscriptions-card-buttons-div">
                  <ButtonOutline
                    children={"View Details"}
                    onClick={() => {
                      handleViewDetails(ele);
                    }}
                  />
                  <ButtonSmall
                    children={"Buy"}
                    onClick={() => {
                      handleBuySubscription(ele);
                    }}
                  />
                </div>
              }
            />
          );
        })}
    </DIV>
  );
};

const DIV = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;

  .subscriptions-card:hover {
    transform: scale(1.02);
    transition: 1sec;
    border: 1px solid var(--primary-grey);
  }

  @media screen and (min-width: 401px) and (max-width: 500px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
  }
  @media screen and (max-width: 400px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;
