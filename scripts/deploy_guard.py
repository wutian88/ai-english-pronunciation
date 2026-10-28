"""Fail closed before Pages upload; same guard used by production and drills."""
import argparse,hashlib,json,os,subprocess,sys,urllib.request,uuid,time
from pathlib import Path
URL='https://wutian88.github.io/ai-english-pronunciation/ai-daily/content.json'
def git(*args):return subprocess.check_output(['git',*args],text=True).strip()
def digest(data):return hashlib.sha256(data).hexdigest()
def live():
    for attempt in range(3):
        try:
            req=urllib.request.Request(URL+'?verify='+uuid.uuid4().hex,headers={'Cache-Control':'no-cache','User-Agent':'AI-Deploy-Verification'})
            with urllib.request.urlopen(req,timeout=30) as r:data=r.read()
            break
        except Exception:
            if attempt==2:raise
            time.sleep(2)
    json.loads(data)
    return digest(data)
def guard(fault=None):
    if fault and os.environ.get('AI_DAILY_FAULT_TEST')!='1':raise RuntimeError('Fault injection restricted to drill job')
    if fault=='before_upload':raise RuntimeError('Injected before-upload failure')
    head=git('rev-parse','HEAD');remote=git('ls-remote','origin','refs/heads/main').split()[0]
    if fault=='remote_head':remote='0'*40
    if head!=remote:raise RuntimeError('Remote main advanced; refusing stale deployment')
    tracked=subprocess.check_output(['git','show','HEAD:public/ai-daily/content.json'])
    built=Path('dist/ai-daily/content.json').read_bytes()
    if digest(tracked)!=digest(built):raise RuntimeError('Built content differs from rebased HEAD; rebuild required')
    print(json.dumps({'head':head,'content_sha256':digest(built),'gate':'passed'}))
def main():
    a=argparse.ArgumentParser();a.add_argument('mode',choices=['gate','baseline','verify']);a.add_argument('--fault');x=a.parse_args()
    if x.mode=='gate':guard(x.fault)
    elif x.mode=='baseline':Path('baseline.sha256').write_text(live(),encoding='utf-8')
    else:
        before=Path('baseline.sha256').read_text(encoding='utf-8');samples=[]
        for _ in range(3):
            after=live();samples.append(after)
            if before!=after:raise RuntimeError('Online content changed during drill; cannot claim unchanged')
            time.sleep(1)
        print(json.dumps({'before':before,'after_samples':samples,'online_unchanged':True}))
if __name__=='__main__':main()
