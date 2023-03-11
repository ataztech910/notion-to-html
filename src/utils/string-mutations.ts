const getFileLinkFromUrl = (url: string) => {
    const removedArguments = url.split('?');
    const mutated = removedArguments[0].match(/([^\/]+$)/);
    return mutated? mutated[0]: '';
};

export { getFileLinkFromUrl };