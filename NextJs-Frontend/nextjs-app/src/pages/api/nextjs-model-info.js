export default function handler(req, res) {
    res.status(200).json({
        model_scale: "1.5x",
        num_faces: 2500
    });
}