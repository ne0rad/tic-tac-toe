const player = (name) => {
    let score = 0;

    const setName = (newName) => {
        name = newName;
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

    return {name, getPoints, setName, addPoint, victoryMsg};
};

export default player;