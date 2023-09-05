"""
This is where the implementation of the plugin code goes.
The CreateGames-class is imported from both run_plugin.py and run_debug.py
"""
import sys
import logging
from webgme_bindings import PluginBase

# Setup a logger
logger = logging.getLogger('CreateGames')
logger.setLevel(logging.INFO)
handler = logging.StreamHandler(sys.stdout)  # By default it logs to stderr..
handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)


class CreateGames(PluginBase):
  def main(self):
    active_node = self.active_node
    core = self.core
    logger = self.logger
    self.namespace = None
    META = self.META
    nodeHash = {}
    nodes = core.load_sub_tree(active_node)
    for node in nodes:
      nodeHash[core.get_path(node)] = node
      
    def CreateGames():
      core = self.core
      root_node = self.root_node
      active_node = self.active_node #the context should be the games folder
      META = self.META

      logger.error('inside the code')
      logger.error(active_node)
      for i in range(5):
        new_game = core.create_node({
            'parent': active_node, 
            'base': META['game']
        });
        core.set_attribute(new_game, 'name', f'game-{i}')
      

      # As the ticatactoegame prototype already has everything setup we do not need
      # to do anything further.
      self.util.save(root_node, self.commit_hash, 'master', 'created a new game object which should be renamed')
      self.create_message(active_node, core.get_path(new_game))
      
      

          
   


