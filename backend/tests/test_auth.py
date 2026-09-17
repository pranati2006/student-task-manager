def test_health():
    from app.main import health
    assert health() == {'status': 'ok'}