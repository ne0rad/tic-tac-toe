const player = (name) => {
    let score = 0;

    const setName = (newName) => {
        name = newName;
    }

    const getName = () => {
        return name;
    }

    const addPoint = () => {
        score++;
    }

    const getPoints = () => {
        return score;
    }

    const victoryMsg = () => {
        document.getElementById("result").textContent = `${name} wins!`;
    }

    return {getName, getPoints, setName, addPoint, victoryMsg};
};

export default player;