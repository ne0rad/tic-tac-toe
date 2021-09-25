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

    const setScore = (newScore) => {
        score = newScore;
    }

    const getPoints = () => {
        return score;
    }

    const victoryMsg = () => {
        document.getElementById("result").textContent = `${name} wins!`;
    }

    return { getName, getPoints, setName, addPoint, victoryMsg, setScore };
};

export default player;