import { VolatileManager } from 'src/modules/volatile/VolatileManager';

const mgr = new VolatileManager();
export function handleVolatile(route) {
  route.get('/api/volatile/:key', (req, res) => {
    const e = mgr.get(req.query);
    if (!e) {
      res.status(404).json({ message: 'Not found', status: 404 });
      return;
    }
    res.status(200).json(e);
  });

  route.post('/api/volatile/:key', (req, res) => {
    const { key } = req.query;
    const e = mgr.create({ key, data: req.body });
    res.status(201).json(e);
  });

  route.put('/api/volatile/:key', (req, res) => {
    const { key } = req.query;
    const e = mgr.update({ key, data: req.body });
    res.status(201).json(e);
  });

  route.delete('/api/volatile/:key', (req, res) => {
    const e = mgr.delete(req.query);
    res.status(201).json(e);
  });
}
