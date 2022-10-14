import styled from "styled-components";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "react-beautiful-dnd";
import { queueAtom, queueToggleAtom } from "../atom";
import { useRecoilState } from "recoil";
import List from "./List";
import { motion } from "framer-motion";
import QueueToggleBtn from "./QueueToggleBtn";
import { AnimatePresence } from "framer-motion";

interface Info {
    id: string;
    title: string[];
    thumbnail: string;
    duration: string;
    owner: string;
}

type Queue = Info[];

const Queue = () => {
    const [queue, setQueue] = useRecoilState(queueAtom);
    const [queueToggle, setQueueToggle] = useRecoilState(queueToggleAtom);

    return (
        <>
            <AnimatePresence>
                {queueToggle ? (
                    <Container
                        variants={wrapperVariants}
                        initial="from"
                        animate="to"
                        exit="exit"
                    >
                        <Wrapper>
                            <Header>
                                <Title>Your Queue</Title>
                            </Header>
                            <QueueWrapper>
                                <Droppable droppableId="queue">
                                    {(provided) => (
                                        <QueueList
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {Object.entries(queue).map(
                                                ([v, info], i) => {
                                                    return (
                                                        <List
                                                            key={`${
                                                                Object(info).id
                                                            }queue${i}`}
                                                            info={Object(info)}
                                                            index={i}
                                                        />
                                                    );
                                                }
                                            )}
                                            {provided.placeholder}
                                        </QueueList>
                                    )}
                                </Droppable>
                            </QueueWrapper>
                        </Wrapper>
                    </Container>
                ) : null}
            </AnimatePresence>
        </>
    );
};

//Object.entries(queue).map([v,info],i) = > {}
//위 경우 value가 type이 무엇이든 넘어갈 때 string으로 넘어가고 다시 형 변환 되는듯.

export default Queue;

/* Framer */

const wrapperVariants = {
    from: { left: -360, opacity: 1 },
    to: {
        left: 0,
        opacity: 1,
        transition: { type: "linear", duration: 0.15 },
    },
    exit: { left: -360, opacity: 0, transition: { duration: 0.15 } },
};

const Container = styled(motion.div)`
    position: absolute;
    top: 0px;
    left: 0px;
    transition: ease-in-out;
`;

const Wrapper = styled.div`
    background: rgb(30, 30, 30);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    width: 450px;
    padding: 10px;
    border-radius: 5px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 5px 10px 0px;
`;

const Title = styled.div`
    color: whitesmoke;
    font-weight: 600;
    font-size: 20px;
    padding: 5px 0px;
`;

const QueueWrapper = styled.div`
    height: 600px;
    overflow-y: auto;
`;

const QueueList = styled.div`
    display: grid;
    grid-template-rows: repeat(1, minmax(0, 1fr));
    grid-auto-flow: row;
    padding-right: 10px;
`;
