const player = (name, ai) => {
    let score = 0;
    if(ai) name = "CPU";

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