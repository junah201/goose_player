import React from "react";
import styled from "styled-components";

interface infoProps {
    [key: string]: {
        id: string;
        title: string[];
        thumbnail: string;
        duration: string;
        owner: string;
    };
}

const List = ({ info }: infoProps) => {
    const { id, duration, owner, thumbnail, title } = info;

    const listClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log(e.currentTarget.id);
    };
    return (
        <Wrapper onClick={listClickHandler} key={`li-${id}`} id={id}>
            <Thumbnail thumbnail={thumbnail} />
            <Info>
                <Title>{title}</Title>
                <SubInfo>
                    <Duration>{duration}</Duration>
                    <Owner>{owner}</Owner>
                </SubInfo>
            </Info>
        </Wrapper>
    );
};

export default List;

interface ThumbnailProps {
    thumbnail: string;
}

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    font-weight: 600;
    background: transparent;
    width: 300px;
    border-radius: 3px;
    overflow-y: auto;
`;

const SubInfo = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const Title = styled.div``;

const Duration = styled.div`
    font-size: 12.5px;
`;

const Owner = styled.div`
    font-size: 12.5px;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    padding: 10px;
    height: 8rem;
    transition: 0.1s ease-in-out;
    color: #111827;
    :hover {
        background: rgba(0, 0, 0, 0.65);
        cursor: pointer;
        color: #cbd5e1;
    }
`;

const Thumbnail = styled.div<ThumbnailProps>`
    background: url(${(props) => props.thumbnail});
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 5px;
    width: 200px;
`;