import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import React from "react";

function Recipe() {
    let params = useParams();

    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");

    const fetchDetails = async () => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        const detailData = await data.json();
        setDetails(detailData);
    };

    useEffect(() => {
        fetchDetails();
    }, [params.name]);

    return (
        <DetailWrapper>
            <h2>{details.title}</h2>
            <Container>
                <Image>
                    <img src={details.image} alt="" />
                </Image>
                <Info>
                    <Button
                        className={activeTab === "instructions" ? "active" : ""}
                        onClick={() => setActiveTab("instructions")}
                    >
                        Instructions
                    </Button>
                    <Button
                        className={activeTab === "ingredients" ? "active" : ""}
                        onClick={() => setActiveTab("ingredients")}
                    >
                        Ingredients
                    </Button>
                    {activeTab === "instructions" && (
                        <div>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: details.summary,
                                }}
                            ></p>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: details.instructions,
                                }}
                            ></p>
                        </div>
                    )}
                    {activeTab === "ingredients" && (
                        <ul>
                            {details.extendedIngredients.map((ingredient) => (
                                <li key={ingredient.id}>
                                    {ingredient.original}
                                </li>
                            ))}
                        </ul>
                    )}
                </Info>
            </Container>
        </DetailWrapper>
    );
}

const DetailWrapper = styled.div`
    margin-top: 1rem;
    margin-bottom: 5rem;

    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }

    h2 {
        margin-bottom: 2rem;
    }

    p {
        margin-top: 2rem;
        font-size: 1.2rem;
        line-height: 2.5rem;
    }

    ul {
        margin-top: 2rem;
        list-style-position: inside;
    }

    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
`;

const Container = styled.div`
    display: flex;

    @media (max-width: 980px) {
        display: flex;
        flex-direction: column;
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 1rem;
    font-weight 600;
`;

const Image = styled.div`
    img {
        max-width: 500px;
        border-radius: 2rem;

        @media (max-width: 980px) {
            width: 100%;
        }
    }
`;

const Info = styled.div`
    margin-left: 5rem;

    @media (max-width: 980px) {
        margin-top: 2rem;
        margin-left: 0;
    }
`;

export default Recipe;
