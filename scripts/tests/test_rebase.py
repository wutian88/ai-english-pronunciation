import os,subprocess,tempfile,unittest
from pathlib import Path
def run(cwd,*args,ok=True):
 p=subprocess.run(['git',*args],cwd=cwd,capture_output=True,text=True)
 if ok and p.returncode:raise AssertionError(p.stderr)
 return p
def setup(root):
 origin=root/'origin.git';run(root,'init','--bare',str(origin))
 a=root/'a';b=root/'b';run(root,'clone',str(origin),str(a))
 for d in [a]:run(d,'config','user.email','test@example.invalid');run(d,'config','user.name','test')
 run(a,'checkout','-b','main');(a/'same.txt').write_text('base\n');run(a,'add','.');run(a,'commit','-m','base');run(a,'push','origin','main')
 run(root,'clone','-b','main',str(origin),str(b));run(b,'config','user.email','test@example.invalid');run(b,'config','user.name','test')
 return a,b
class RebaseTests(unittest.TestCase):
 def test_preserves_independent_remote_commit(self):
  with tempfile.TemporaryDirectory() as d:
   a,b=setup(Path(d));(a/'remote.txt').write_text('remote');run(a,'add','.');run(a,'commit','-m','remote');run(a,'push','origin','main')
   (b/'daily.txt').write_text('daily');run(b,'add','.');run(b,'commit','-m','daily');run(b,'pull','--rebase','origin','main');run(b,'push','origin','HEAD:main')
   self.assertEqual((b/'remote.txt').read_text(),'remote');self.assertEqual((b/'daily.txt').read_text(),'daily')
 def test_conflict_aborts_before_publish(self):
  with tempfile.TemporaryDirectory() as d:
   a,b=setup(Path(d));(a/'same.txt').write_text('remote\n');run(a,'add','.');run(a,'commit','-m','remote');run(a,'push','origin','main')
   remote=run(a,'rev-parse','HEAD').stdout.strip();(b/'same.txt').write_text('local\n');run(b,'add','.');run(b,'commit','-m','local')
   result=run(b,'pull','--rebase','origin','main',ok=False);self.assertNotEqual(result.returncode,0)
   self.assertEqual(run(a,'ls-remote','origin','refs/heads/main').stdout.split()[0],remote)
   run(b,'rebase','--abort')
if __name__=='__main__':unittest.main()
