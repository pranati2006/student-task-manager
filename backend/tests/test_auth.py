def test_health():
    from app.main import health_check
    assert health_check() == {'status': 'ok', 'service': 'running'}