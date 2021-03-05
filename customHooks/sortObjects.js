export const sortAddsByDate = (input) => {
    const timestampsArray = [];
    const outputArray = [];
    input.forEach((el) => {
        timestampsArray.push(el.timestampFrom.seconds)
    });
    timestampsArray.sort((a, b) => a - b);
    timestampsArray.forEach((el) => {
        input.forEach((inputEl) => {
            if(el === inputEl.timestampFrom.seconds) {
                outputArray.push(inputEl);
            }
        });
    });
    return outputArray;
};
//niezbyt to DRY, trzeba ujednolicić nazewnictwo w obiektach w bazie
export const sortEventsByDate = input => {
    const timestampsArray = [];
    const outputArray = [];
    input.forEach((el) => {
        timestampsArray.push(el.eventTimestamp.seconds)
    });
    timestampsArray.sort((a, b) => a - b);
    timestampsArray.forEach((el) => {
        input.forEach((inputEl) => {
            if(el === inputEl.eventTimestamp.seconds) {
                outputArray.push(inputEl);
            }
        });
    });
    return outputArray;
};