import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent))
from server.app import app

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=5001)
    # create_db()