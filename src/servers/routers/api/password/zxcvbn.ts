import zxcvbn from 'zxcvbn';

export const handleZxcvbnStrength = (req, res) => {
  const result = zxcvbn((req.query['password'] ?? '') + '');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).json(result);
};
