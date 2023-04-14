function validateToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res
      .status(401)
      .json({ message: 'Token não encontrado' });
    }
    if (token.length !== 16 || typeof token !== 'string') {
      return res
      .status(401)
      .json({ message: 'Token inválido' });
    }
    next();
  }
  
  function validateName(req, res, next) {
    const { name } = req.body;
    if (!name) {
      return res
      .status(400)
      .json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
      return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
  }
  
  function validateAge(req, res, next) {
    const { age } = req.body;
    if (!age) {
      return res
      .status(400)
      .json({ message: 'O campo "age" é obrigatório' });
    }
    if (typeof age !== 'number' || age < 18 || !Number.isInteger(age)) {
      return res
      .status(400)
      .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
    }

    next();
  }
  
  function validateTalk(req, res, next) {
    const { talk } = req.body;
    
    if (!talk) {
      return res
      .status(400)
      .json({ message: 'O campo "talk" é obrigatório' });
    }
    
    next();
  }
  
  function validateWatchedAt(req, res, next) {
    const { watchedAt } = req.body.talk;
  
    if (!watchedAt) {
      return res
      .status(400)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
    }
  
    if (!/\d{2}\/\d{2}\/\d{4}/.test(watchedAt)) {
      return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
  
    next();
  }
  
  function validateRateOnetoFive(req, res, next) {
    const { rate } = req.body.talk;
  
    if (!Number.isInteger(rate) || Number(rate) <= 0 || Number(rate) > 5) {
      return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    next();
  }  

  function validateRatePresence(req, res, next) {
    const { rate } = req.body.talk;

    if (rate === undefined) {
      return res
      .status(400)
      .json({ message: 'O campo "rate" é obrigatório' });
    }
  
    next();
  }  

module.exports = {
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateWatchedAt,
    validateRateOnetoFive,
    validateRatePresence,
};
