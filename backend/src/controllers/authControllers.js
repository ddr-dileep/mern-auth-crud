const authControllers = {
  register: (req, res) => {
    res.status({ success: true, register: true });
  },
};

export default authControllers;
